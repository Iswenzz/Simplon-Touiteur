<?php

namespace App\Tests\Entity;

use App\Entity\Hashtag;
use DateTime;
use PHPUnit\Framework\TestCase;

class HashtagTest extends TestCase
{
	public Hashtag $hashtag;

	public function __construct($name = null, array $data = [], $dataName = '')
	{
		parent::__construct($name, $data, $dataName);
		$this->hashtag = new Hashtag();
	}

	public function testSpecialCharacters()
    {
    	$this->hashtag->setName("Test");
		$this->assertEquals(true, preg_match("/^[a-zA-Z0-9]*$/", $this->hashtag->getName()));
		$this->hashtag->setName("Téést_");
		$this->assertEquals(false, preg_match("/^[a-zA-Z0-9]*$/", $this->hashtag->getName()));
    }

	public function testDate()
	{
		$this->hashtag->setDate(new DateTime("NOW"));
		$this->assertEquals(true, $this->hashtag->getDate()->getTimestamp() > 0);
    }

	public function testTweet()
	{
		$this->hashtag->setTweet(null);
		$this->assertEquals(null, $this->hashtag->getTweet());
    }

	public function testId()
	{
		$this->assertTrue(true, $this->hashtag->getId() >= 0);
    }
}
