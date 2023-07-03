

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "feedgentime" TIMESTAMP DEFAULT NULL
);

CREATE TABLE rss_sources (
	rss_id SERIAL PRIMARY KEY,
	user_id INT REFERENCES user NOT NULL,
	source_name VARCHAR (80) NOT NULL,
	source_url TEXT NOT NULL,
    ismute BOOLEAN DEFAULTE false
);

CREATE TABLE feeds (
	post_id SERIAL PRIMARY KEY,
	rss_id INT REFERENCES "rss_sources", 
	creator TEXT,
	title TEXT,
	link TEXT,
	pubDate TEXT,
	"content" TEXT,
	contentSnippet TEXT,
	guid TEXT,
	isoDate TEXT, 
	author TEXT,
	isRead BOOLEAN DEFAULT false
);

CREATE TABLE saves (
	post_id SERIAL PRIMARY KEY,
	user_id INT REFERENCES "user", 
	creator TEXT,
	title TEXT,
	link TEXT,
	pubDate TEXT,
	"content" TEXT,
	contentSnippet TEXT,
	guid TEXT,
	isoDate TEXT,
	author TEXT,
	isRead BOOLEAN DEFAULT false
);

INSERT INTO feeds (rss_id, creator, 1title, link, pubDate, content, contentSnippet, guid, isoDate, author)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);


INSERT INTO "rss_sources" ("user_id", "source_name", "source_url")
VALUES (1, 'reddit', 'https://www.reddit.com/.rss');

INSERT INTO "rss_sources" ("user_id", "source_name", "source_url")
VALUES (1, 'NYT', 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml');

INSERT INTO "rss_sources" ("user_id", "source_name", "source_url")
VALUES (1, 'hackernews', 'https://hnrss.org/best');

INSERT INTO "rss_sources" ("user_id", "source_name", "source_url")
VALUES (1, 'Ars Technica Tech Lab', 'https://feeds.arstechnica.com/arstechnica/technology-lab');

INSERT INTO "rss_sources" ("user_id", "source_name", "source_url")
VALUES (1, 'Splash 247', 'https://splash247.com/feed/');


SELECT * FROM rss_sources WHERE id=1;


SELECT * FROM feeds
JOIN rss_sources ON feeds.rss_id = rss_sources.rss_id
WHERE user_id = 1
LIMIT 10
OFFSET 90
;

DELETE feeds
INNER JOIN rss_sources ON feeds.rss_id = rss_sources.rss_id
WHERE user_id = 1 AND issaved = false;

DELETE FROM feeds
USING rss_sources
WHERE feeds.rss_id = rss_sources.rss_id AND rss_sources.user_id = $1 AND feeds.issaved = false;


DELETE FROM feeds
USING rss_sources
WHERE feeds.rss_id = rss_sources.rss_id 
AND rss_sources.user_id = 1;

UPDATE feeds SET rss_id = NULL WHERE rss_id = 2;
DELETE FROM rss_sources WHERE rss_id = 2;

DELETE FROM feeds
USING rss_sources
WHERE feeds.rss_id = rss_sources.rss_id 
AND rss_sources.user_id = 1
AND feeds.issaved = false;
                        
                        
UPDATE "user" SET feedgentime = CURRENT_TIMESTAMP WHERE id=1;


SELECT "feedgentime" FROM "user" WHERE id=1;

SELECT COUNT(post_id) FROM feeds;

DELETE FROM feeds WHERE rss_id IS NULL;









