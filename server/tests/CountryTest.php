<?php

namespace App\Tests;

use App\Entity\Country;
use DateTime;
use PHPUnit\Framework\TestCase;

class CountryTest extends TestCase
{
	public Country $country;

	public function __construct($name = null, array $data = [], $dataName = '')
	{
		parent::__construct($name, $data, $dataName);
		$this->country = new Country();
	}

	public function testName()
	{
		$this->country->setName("Test");
		$this->assertEquals(true, strlen($this->country->getName()) > 0);
	}

	public function testCode()
	{
		$this->country->setCode(1);
		$this->assertEquals(true, $this->country->getCode() > 0);
	}

	public function testId()
	{
		$this->assertTrue(true, $this->country->getId() >= 0);
	}
}
