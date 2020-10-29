<?php

namespace App\Tests;

use App\Entity\Retweet;
use DateTime;
use PHPUnit\Framework\TestCase;

class RetweetTest extends TestCase
{
	public Retweet $retweet;

	public function __construct($name = null, array $data = [], $dataName = '')
	{
		parent::__construct($name, $data, $dataName);
		$this->retweet = new Retweet();
	}

	public function testUser()
	{
		$this->retweet->setUser(null);
		$this->assertEquals(null, $this->retweet->getUser());
	}

	public function testDate()
	{
		$this->retweet->setDate(new DateTime("NOW"));
		$this->assertEquals(true, $this->retweet->getDate()->getTimestamp() > 0);
	}

	public function testTweet()
	{
		$this->retweet->setTweet(null);
		$this->assertEquals(null, $this->retweet->getTweet());
	}

	public function testId()
	{
		$this->assertTrue(true, $this->retweet->getId() >= 0);
	}
}
