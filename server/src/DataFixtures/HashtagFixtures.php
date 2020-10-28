<?php

namespace App\DataFixtures;

use App\Entity\Hashtag;
use App\Entity\Tweet;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class HashtagFixtures extends Fixture implements DependentFixtureInterface
{
	public const HASHTAG_REFERENCE = "hashtag-ref";

    public function load(ObjectManager $manager): void
    {
		/**
		 * @var Tweet $tweet
		 */
		$faker = Factory::create("en_US");
		$tweet = $this->getReference(TweetFixtures::TWEET_REFERENCE);

		for ($i = 0; $i < 3; $i++)
		{
			$hashtag = new Hashtag();
			$hashtag->setDate($faker->dateTime);
			$hashtag->setTweet($tweet);
			$hashtag->setName($faker->name);
			$tweet->addHashtag($hashtag);
			$manager->persist($hashtag);
		}

		$manager->flush();
		$this->addReference(self::HASHTAG_REFERENCE, $hashtag);
    }

	public function getDependencies(): array
	{
		return [
			TweetFixtures::class
		];
	}
}
