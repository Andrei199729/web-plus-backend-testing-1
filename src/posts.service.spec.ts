import { Post, PostsService } from "./posts.service";
describe("PostsService", () => {
  let postsService: PostsService;
  const post: Omit<Post, "id" | "date"> = {
    text: "Mocked post",
  };

  beforeEach(async () => {
    postsService = new PostsService();

    postsService.create({ text: "Some pre-existing post" });
  });

  it("should add a new post", () => {
    // Создаем новый пост
    const newPost = {
      text: "New test post",
    };

    // Добавляем пост с помощью метода create
    const createdPost = postsService.create(newPost);

    // Проверяем, что созданный пост определен
    expect(createdPost).toBeDefined();

    // Проверяем, что у поста есть id и дата
    expect(createdPost.id).toBeDefined();
    expect(createdPost.date).toBeDefined();

    // Проверяем, что текст поста соответствует ожидаемому тексту
    expect(createdPost.text).toEqual(newPost.text);

    // Проверяем, что пост был добавлен в массив постов
    const foundPost = postsService.find(createdPost.id);
    expect(foundPost).toEqual(createdPost);
  });

  it("should find a post", () => {
    // Создаем новый пост
    const newPost = {
      text: "Test post",
    };
    const createdPost = postsService.create(newPost);

    const foundPost = postsService.find(createdPost.id);

    expect(foundPost).toBeDefined();

    if (foundPost) {
      expect(foundPost.id).toEqual(createdPost.id);
      expect(foundPost.text).toEqual(createdPost.text);
      expect(foundPost.date).toEqual(createdPost.date);
    } else {
      throw new Error("Post not found");
    }
  });
});
