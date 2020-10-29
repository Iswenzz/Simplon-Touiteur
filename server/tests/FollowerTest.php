<?php

namespace App\Tests;

use App\Entity\Follower;
use DateTime;
use PHPUnit\Framework\TestCase;

class FollowerTest extends TestCase
{
	public Follower $follower;

	public function __construct($name = null, array $data = [], $dataName = '')
	{
		parent::__construct($name, $data, $dataName);
		$this->follower = new Follower();
	}

	public function testUser()
	{
		$this->follower->setUser(null);
		$this->assertEquals(null, $this->follower->getUser());
	}

	public function testDate()
	{
		$this->follower->setDate(new DateTime("NOW"));
		$this->assertEquals(true, $this->follower->getDate()->getTimestamp() > 0);
	}

	public function testFollow()
	{
		$this->follower->setFollow(null);
		$this->assertEquals(null, $this->follower->getFollow());
	}

	public function testId()
	{
		$this->assertTrue(true, $this->follower->getId() >= 0);
	}
}
