#

# Models

```sql
CREATE TABLE [USER] (
    ID INT IDENTITY(1, 1),
    USERNAME VARCHAR(63) UNIQUE,
    EMAIL VARCHAR(255) UNIQUE,
    [HASHED_PASSWORD] VARCHAR(255),
    IS_ADMINISTRATOR BIT,
    IS_AUTHOR BIT,
    PRIMARY KEY (ID)
)

CREATE TABLE POST (
    ID INT IDENTITY(1, 1),
    [DATE] DATE,
    [TIME] TIME,
    TITLE VARCHAR(255),
    SUMMARY VARCHAR(255),
    [TEXT] TEXT,
    [IMAGE] IMAGE,
    AUTHOR_ID INT,
    PRIMARY KEY (ID),
    FOREIGN KEY (AUTHOR_ID) REFERENCES [USER] (ID)
)

CREATE TABLE COMMENT (
    POST_ID INT,
    ID INT IDENTITY(1, 1),
    USER_ID INT,
    [TEXT] TEXT,
    PRIMARY KEY (POST_ID, ID),
    FOREIGN KEY (POST_ID) REFERENCES POST (ID),
    FOREIGN KEY (USER_ID) REFERENCES [USER] (ID)
)

CREATE TABLE CATEGORY (
    ID INT IDENTITY(1, 1),
    [NAME] VARCHAR(63),
    PRIMARY KEY (ID)
)

CREATE TABLE POST_HAS_CATEGORY (
    POST_ID INT,
    CATEGORY_ID INT,
    FOREIGN KEY (POST_ID) REFERENCES POST (ID),
    FOREIGN KEY (CATEGORY_ID) REFERENCES CATEGORY (ID)
)
```

# Use Cases

| Use Case                  | Method | Request URL                             | Request Body                           | Response Body                    |
| ------------------------- | ------ | --------------------------------------- | -------------------------------------- | -------------------------------- |
| Create User               | POST   | /users                                  | username, email, hashed_password       | result: boolean                  |
| Get User By Id            | GET    | /users/{userId}                         |                                        | result: User?, error: string     |
| Get User By Username      | GET    | /users/by-username/{username}           |                                        | result: User?, error: string     |
| Set User Is Author        | PATCH  | /users/{userId}/author/{value}          |                                        | result: boolean, error: string   |
| Set User Is Administrator | PATCH  | /users/{userId}/admin/{value}           |                                        | result: boolean, error: string   |
| Get All Users             | GET    | /admin/users                            |                                        | users: Array<User>               |
| Get All Authors           | GET    | /admin/users/authors                    |                                        | users: Array<User>               |
| Create Post               | POST   | /posts                                  | title, summary, text, image, author_id | result: boolean                  |
| Get Post By Id            | GET    | /posts/{postId}                         |                                        | result: Post?, error: string     |
| Get All Posts             | GET    | /posts                                  |                                        | posts: Array<Post>               |
| Create Comment            | POST   | /posts/{postId}/comments                | user_id, text                          | result: boolean                  |
| Get Comment By Id         | GET    | /posts/{postId}/comments/{commentId}    |                                        | result: Comment?, error: string  |
| Get All Comments Of Post  | GET    | /posts/{postId}/comments                |                                        | comments: Array<Comment>         |
| Create Category           | POST   | /categories                             | name                                   | result: boolean                  |
| Get Category By Id        | GET    | /categories/{categoryId}                |                                        | result: Category?, error: string |
| Get All Categories        | GET    | /categories                             |                                        | categories: Array<Category>      |
| Add Category To Post      | POST   | /posts/{postId}/categories/{categoryId} |                                        | result: boolean, error: string   |
| Remove Category To Post   | DELETE | /posts/{postId}/categories/{categoryId} |                                        | result: boolean, error: string   |
| Authenticate User         | POST   | /auth/users/{userId}                    | hashed_password                        | result: boolean, error: string   |
| Start Session             | POST   | /sessions/{userId}                      | hashed_password                        | result: boolean, error: string   |
| End Session               | DELETE | /sessions                               |                                        |                                  |
| Get Session               | GET    | /sessions                               |                                        | user_id: number                  |
| Get User Posts            | GET    | /users/{userId}/posts                   |                                        | posts: Array<Post>               |


# Pages

* Sign Up
* Sign In
* Index (List Posts)
* Create Post
* User Profile
* List Authors
* List Categories
