<?php

namespace App\Tests\Entity;

use App\Entity\Following;
use DateTime;
use PHPUnit\Framework\TestCase;

class FollowingTest extends TestCase
{
	public Following $following;

	public function __construct($name = null, array $data = [], $dataName = '')
	{
		parent::__construct($name, $data, $dataName);
		$this->following = new Following();
	}

	public function testUser()
	{
		$this->following->setUser(null);
		$this->assertEquals(null, $this->following->getUser());
	}

	public function testDate()
	{
		$this->following->setDate(new DateTime("NOW"));
		$this->assertEquals(true, $this->following->getDate()->getTimestamp() > 0);
	}

	public function testFollow()
	{
		$this->following->setFollowing(null);
		$this->assertEquals(null, $this->following->getFollowing());
	}

	public function testId()
	{
		$this->assertTrue(true, $this->following->getId() >= 0);
	}
}
