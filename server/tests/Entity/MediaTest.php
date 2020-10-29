<?php

namespace App\Tests\Entity;

use App\Entity\Media;
use DateTime;
use PHPUnit\Framework\TestCase;

class MediaTest extends TestCase
{
	public Media $media;

	public function __construct($name = null, array $data = [], $dataName = '')
	{
		parent::__construct($name, $data, $dataName);
		$this->media = new Media();
	}

	public function testAuthor()
	{
		$this->media->setAuthor(null);
		$this->assertEquals(null, $this->media->getAuthor());
	}

	public function testDate()
	{
		$this->media->setDate(new DateTime("NOW"));
		$this->assertEquals(true, $this->media->getDate()->getTimestamp() > 0);
	}

	public function testTweet()
	{
		$this->media->setTweet(null);
		$this->assertEquals(null, $this->media->getTweet());
	}

	public function testUrl()
	{
		$this->media->setUrl("www.google.com");
		$this->assertEquals(true,
			preg_match("%^((https?://)|(www\.))([a-z0-9-].?)+(:[0-9]+)?(/.*)?$%i",
				$this->media->getUrl()));
		$this->media->setUrl("wwww.google.com");
		$this->assertEquals(false,
			preg_match("%^((https?://)|(www\.))([a-z0-9-].?)+(:[0-9]+)?(/.*)?$%i",
				$this->media->getUrl()));
	}

	public function testId()
	{
		$this->assertTrue(true, $this->media->getId() >= 0);
	}
}
