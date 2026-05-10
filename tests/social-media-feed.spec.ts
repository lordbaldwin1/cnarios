import { test, expect } from "../fixtures";

test.describe("social media feed tests", () => {
  test("like button increases count and icon is filled", async ({
    socialMediaPage,
  }) => {
    await socialMediaPage.goto();
    expect(await socialMediaPage.posts.count()).toBeGreaterThan(0);

    const post = await socialMediaPage.getFirstPostForUser("John");
    await expect(post.likeButton).toBeEnabled();
    await expect(post.likeText).toBeVisible();
    await expect(post.likeIcon).not.toContainClass("MuiSvgIcon-colorError");

    // probably best to add helper to get this, or return initial like count with post object
    const initialLikes = Number((await post.likeText.innerText()).split(" ")[0]);

    await post.likeButton.click();
    await expect(post.likeText).toHaveText(`${initialLikes + 1} likes`);
    await expect(post.likeIcon).toContainClass("MuiSvgIcon-colorError");
  });

  test("unlike post decreases count and icon is no longer filled", async ({
    socialMediaPage,
  }) => {
    await socialMediaPage.goto();
    expect(await socialMediaPage.posts.count()).toBeGreaterThan(0);

    const post = await socialMediaPage.getFirstPostForUser("Emma");
    const initialLikes = Number((await post.likeText.innerText()).split(" ")[0]);

    await post.likeButton.click();
    await expect(post.likeText).toHaveText(`${initialLikes + 1} likes`);
    await expect(post.likeIcon).toContainClass("MuiSvgIcon-colorError");

    await post.likeButton.click();
    await expect(post.likeText).toHaveText(`${initialLikes} likes`);
    await expect(post.likeIcon).not.toContainClass("MuiSvgIcon-colorError");
  });

  test("liking post creates new notification", async ({ socialMediaPage, page }) => {
    await socialMediaPage.goto();
    const post = await socialMediaPage.getFirstPostForUser("Emma");

    await post.likeButton.click();
    await expect(socialMediaPage.notificationBadge).toHaveText("1");
    
    await socialMediaPage.notificationButton.click();
    await expect(socialMediaPage.notificationModal).toBeVisible();
    await expect(socialMediaPage.notifications).toHaveText(["You liked Emma's post"]);
    
    // maybe better way to do this? it was failing by clicking modal backdrop or modal locators
    await page.keyboard.press("Escape");
    await post.likeButton.click();
    
    await socialMediaPage.notificationButton.click();
    await expect(socialMediaPage.notifications).toHaveText(["You unliked Emma's post", "You liked Emma's post"]);
  });

  test("opening notifications marks them as read", async ({ socialMediaPage, page }) => {
    await socialMediaPage.goto();
    const post = await socialMediaPage.getFirstPostForUser("Liam");

    await post.likeButton.click();
    await expect(socialMediaPage.notificationBadge).toHaveText("1");

    await socialMediaPage.notificationButton.click();
    await page.keyboard.press("Escape"); // no close button on modal
    await expect(socialMediaPage.notificationBackdrop).toBeHidden();
  });
  
  test("different posts maintain independent state with likes/unlikes", async ({ socialMediaPage }) => {
    await socialMediaPage.goto();
    const firstPost = await socialMediaPage.getFirstPostForUser("John");
    const secondPost = await socialMediaPage.getFirstPostForUser("Emma");
    const thirdPost = await socialMediaPage.getFirstPostForUser("Liam");

    const firstInitialLikes = Number((await firstPost.likeText.innerText()).split(" ")[0]);
    const secondInitialLikes = Number((await secondPost.likeText.innerText()).split(" ")[0]);
    const thirdInitialLikes = Number((await thirdPost.likeText.innerText()).split(" ")[0]);

    await firstPost.likeButton.click();
    await secondPost.likeButton.click();

    await expect(firstPost.likeText).toHaveText(`${firstInitialLikes + 1} likes`);
    await expect(firstPost.likeIcon).toContainClass("MuiSvgIcon-colorError");
    
    await expect(secondPost.likeText).toHaveText(`${secondInitialLikes + 1} likes`);
    await expect(secondPost.likeIcon).toContainClass("MuiSvgIcon-colorError");
    
    await expect(thirdPost.likeText).toHaveText(`${thirdInitialLikes} likes`);
    await expect(thirdPost.likeIcon).not.toContainClass("MuiSvgIcon-colorError");
  });
});
