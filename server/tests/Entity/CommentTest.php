<?php

namespace App\Tests\Entity;

use App\Entity\Comment;
use DateTime;
use PHPUnit\Framework\TestCase;

class CommentTest extends TestCase
{
    public Comment $comment;

	public function __construct($name = null, array $data = [], $dataName = '')
	{
		parent::__construct($name, $data, $dataName);
		$this->comment = new Comment();
	}
    public function testDate()
	{
		$this->comment->setDate(new DateTime("NOW"));
		$this->assertEquals(true, $this->comment->getDate()->getTimestamp() > 0);
    }

    public function testTweet()
	{
		$this->comment->setTweet(null);
		$this->assertEquals(null, $this->comment->getTweet());
    }

	public function testId()
	{
		$this->assertTrue(true, $this->comment->getId() >= 0);
    }

    public function testContent()
	{
		$this->comment->setContent("Test");
		$this->assertTrue(true, $this->comment->getContent() >= 0);
    }
}
