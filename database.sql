CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "feedgentime" TIMESTAMP DEFAULT NULL
);

CREATE TABLE rss_sources (
	rss_id SERIAL PRIMARY KEY,
	user_id INT REFERENCES "user" NOT NULL,
	source_name VARCHAR (80) NOT NULL,
	source_url TEXT NOT NULL,
	ismute BOOLEAN DEFAULT FALSE
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
	parsDate TEXT,
	isRead BOOLEAN DEFAULT false,
	isSaved BOOLEAN DEFAULT false
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
	parsDate TEXT,
	isRead BOOLEAN DEFAULT true,
	isSaved BOOLEAN DEFAULT true
);







