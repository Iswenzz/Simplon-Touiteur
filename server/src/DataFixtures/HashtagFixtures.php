<?php

namespace App\DataFixtures;

use App\Entity\Hashtag;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class HashtagFixtures extends Fixture
{
	public const HASHTAG_REFERENCE = "hashtag-ref";

    public function load(ObjectManager $manager)
    {
//		$faker = Factory::create("en_US");
//		$hashtag = new Hashtag();
//		$hashtag->setDate($faker->dateTime);
//		$hashtag->setTweet(null);
//		$hashtag->setName($faker->name);
//
//		$manager->persist($hashtag);
//		$manager->flush();
//		$this->addReference(self::HASHTAG_REFERENCE, $hashtag);
    }
}
