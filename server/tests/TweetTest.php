<?php

namespace App\Tests;

use App\Entity\Comment;
use App\Entity\Hashtag;
use App\Entity\Like;
use App\Entity\Retweet;
use App\Entity\Tweet;
use DateTime;
use PHPUnit\Framework\TestCase;

class TweetTest extends TestCase
{
	public Tweet $tweet;

	public function __construct($name = null, array $data = [], $dataName = '')
	{
		parent::__construct($name, $data, $dataName);
		$this->tweet = new Tweet();
	}

	public function testCtor()
	{
		$tweet = new Tweet();
		$this->assertTrue(true);
	}

	public function testAuthor()
	{
		$this->tweet->setAuthor(null);
		$this->assertEquals(null, $this->tweet->getAuthor());
	}

	public function testCreatedAt()
	{
		$this->tweet->setCreatedAt(new DateTime("NOW"));
		$this->assertEquals(true, $this->tweet->getCreatedAt()->getTimestamp() > 0);
	}

	public function testContent()
	{
		$this->tweet->setContent("Lorem ipsum");
		$this->assertEquals(true, $this->tweet->getContent() <= 140);
	}

	public function testHashtag()
	{
		$hashtag = new Hashtag();
		$this->tweet->addHashtag($hashtag);
		$this->assertEquals(true, count($this->tweet->getHashtags()) > 0);
		$this->tweet->removeHashtag($hashtag);
		$this->assertEquals(false, count($this->tweet->getHashtags()) > 0);
	}

	public function testComments()
	{
		$comments = new Comment();
		$this->tweet->addComment($comments);
		$this->assertEquals(true, count($this->tweet->getComments()) > 0);
		$this->tweet->removeComment($comments);
		$this->assertEquals(false, count($this->tweet->getComments()) > 0);
	}

	public function testRetweets()
	{
		$retweet = new Retweet();
		$this->tweet->addRetweet($retweet);
		$this->assertEquals(true, count($this->tweet->getRetweets()) > 0);
		$this->tweet->removeRetweet($retweet);
		$this->assertEquals(false, count($this->tweet->getRetweets()) > 0);
	}

	public function testLikes()
	{
		$like = new Like();
		$this->tweet->addLike($like);
		$this->assertEquals(true, count($this->tweet->getLikes()) > 0);
		$this->tweet->removeLike($like);
		$this->assertEquals(false, count($this->tweet->getLikes()) > 0);
	}

	public function testId()
	{
		$this->assertTrue(true, $this->tweet->getId() >= 0);
	}
}
