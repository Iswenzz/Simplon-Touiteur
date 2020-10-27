<?php

namespace App\DataFixtures;

use App\Entity\Hashtag;
use App\Entity\Tweet;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class TweetFixtures extends Fixture
{
	public const TWEET_REFERENCE = "tweet-ref";

    public function load(ObjectManager $manager)
    {
		$faker = Factory::create("en_US");

		// Hashtag
		$hashtag = new Hashtag();
		$hashtag->setDate($faker->dateTime);
		$hashtag->setTweet(null);
		$hashtag->setName($faker->name);

		// Tweet
		$tweet = new Tweet();
		$tweet->setAuthor(null);
		$tweet->setCreatedAt($faker->dateTime);
		$tweet->setContent($faker->text);
		$tweet->addHashtag($hashtag);

		$manager->persist($hashtag);
		$manager->persist($tweet);
        $manager->flush();
        $this->addReference(self::TWEET_REFERENCE, $tweet);
    }
}
