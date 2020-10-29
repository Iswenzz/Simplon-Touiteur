<?php

namespace App\Tests\Entity;

use App\Entity\Like;
use DateTime;
use PHPUnit\Framework\TestCase;

class LikeTest extends TestCase
{
    public Like $like;

	public function __construct($name = null, array $data = [], $dataName = '')
	{
		parent::__construct($name, $data, $dataName);
		$this->like = new Like();
	}
    public function testDate()
	{
		$this->like->setDate(new DateTime("NOW"));
		$this->assertEquals(true, $this->like->getDate()->getTimestamp() > 0);
    }

    public function testTweet()
	{
		$this->like->setTweet(null);
		$this->assertEquals(null, $this->like->getTweet());
    }

	public function testId()
	{
		$this->assertTrue(true, $this->like->getId() >= 0);
    }

    public function testUser()
    {
        $this->like->setUser(null);
        $this->assertEquals(null, $this->like->getUser());
    }
}
