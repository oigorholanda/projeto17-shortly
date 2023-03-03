CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(50)  NOT NULL,
    password TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT (CURRENT_DATE AT TIME ZONE 'America/Sao_Paulo')
);

CREATE TABLE sessions(
    id SERIAL PRIMARY KEY,
    "userId" INTEGER REFERENCES users(id),
    token TEXT UNIQUE NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'America/Sao_Paulo')
);

CREATE TABLE urls(
    id SERIAL PRIMARY KEY,
    "userId" INTEGER REFERENCES users(id),
    url TEXT NOT NULL,
    "shortUrl" VARCHAR(10) NOT NULL UNIQUE,
    "visitCount" BIGINT NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'America/Sao_Paulo')
);


-- DROP TABLE users;
-- DROP TABLE sessions;
-- DROP TABLE urls;

-- SELECT * FROM users;
-- SELECT * FROM sessions;
-- SELECT * FROM urls;

-- SELECT users.id, users.name, COALESCE(links_count, 0) AS "linksCount", COALESCE(visit_count, 0) AS "visitCount"
-- FROM users
-- LEFT JOIN (
--   SELECT "userId", COUNT(*) AS links_count, SUM("visitCount") AS visit_count
--   FROM urls
--   GROUP BY "userId"
-- ) AS url_counts ON users.id = url_counts."userId"
-- ORDER BY visit_count DESC NULLS LAST, links_count DESC NULLS LAST, users.id ASC
-- LIMIT 10;
