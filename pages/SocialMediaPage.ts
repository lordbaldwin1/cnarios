import { Locator, Page } from "@playwright/test";

export class SocialMediaPage {
  private readonly page: Page;
  readonly posts: Locator;
  readonly notificationButton: Locator;
  readonly notificationBadge: Locator;
  readonly notificationModal: Locator;
  readonly notifications: Locator;
  readonly notificationBackdrop: Locator;

  constructor(page: Page) {
    this.page = page;
    this.posts = this.page.locator(".MuiCard-root.shadow-md");
    this.notificationButton = this.page.locator(".w-full.flex.justify-end.pr-6 > button");
    this.notificationBadge = this.notificationButton.locator("span.MuiBadge-badge.MuiBadge-standard");
    this.notificationModal = this.page.getByRole("presentation");
    this.notifications = this.notificationModal.getByRole("paragraph");
    this.notificationBackdrop = this.notificationModal.locator(".MuiBackdrop-root");
  }

  async goto() {
    await this.page.goto("/challenges/social-media-feed#challenge");
  }

  async getFirstPostForUser(username: string) {
    const post = this.posts
      .filter({
        has: this.page.getByRole("heading", {
          level: 6,
          name: username,
          exact: true,
        }),
      })
      .nth(0);
    
    return {
      likeButton: post.getByRole("button"),
      likeText: post.getByText(/like/),
      likeIcon: post.locator("svg.MuiSvgIcon-root"),
    }
  }
}
