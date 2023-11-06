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

| Use Case                 | Method | URL                                     | Body                                   |
| ------------------------ | ------ | --------------------------------------- | -------------------------------------- |
| ~~Create User~~          | POST   | /users                                  | username, email, hashed_password       |
| ~~Get User By Id~~       | GET    | /users/{userId}                         |                                        |
| Get All Users            | GET    | /admin/users                            |                                        |
| Get All Authors          | GET    | /admin/users/authors                    |                                        |
| Create Post              | POST   | /posts                                  | title, summary, text, image, author_id |
| Get Post By Id           | GET    | /posts/{postId}                         |                                        |
| Get All Posts            | GET    | /posts                                  |                                        |
| Create Comment           | POST   | /posts/{postId}/comments                | user_id, text                          |
| Get Comment By Id        | GET    | /posts/{postId}/comments/{commentId}    |                                        |
| Get All Comments Of Post | GET    | /posts/{postId}/comments                |                                        |
| Create Category          | POST   | /categories                             | name                                   |
| Get Category By Id       | GET    | /categories/{categoryId}                |                                        |
| Get All Categories       | GET    | /categories                             |                                        |
| Add Category To Post     | POST   | /posts/{postId}/categories/{categoryId} |                                        |
| Remove Category To Post  | DELETE | /posts/{postId}/categories/{categoryId} |                                        |
| Authenticate User        | POST   | /auth/users/{userId}                    | hashed_password                        |

# Pages

* Sign Up
* Sign In
* Index (List Posts)
* Create Post
* User Profile
* List Authors
* List Categories
