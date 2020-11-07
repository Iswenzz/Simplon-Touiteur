<?php

namespace App\DataFixtures;

use App\Entity\Hashtag;
use App\Entity\Tweet;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class TweetFixtures extends Fixture implements DependentFixtureInterface
{
	public const TWEET_REFERENCE = "tweet-ref";

    public function load(ObjectManager $manager): void
    {
		/**
		 * @var User $user
		 */
		$faker = Factory::create("en_US");
		// Tweet
		for ($i = 0; $i < 30; $i++)
		{
			$user = $this->getReference(UserFixtures::USER_REFERENCE . $i);
			$tweet = new Tweet();
			$tweet->setAuthor($user);
			$tweet->setCreatedAt($faker->dateTime);
			$tweet->setContent($faker->realText(100));

			$manager->persist($tweet);
			$manager->flush();
			if (!$this->hasReference(self::TWEET_REFERENCE))
				$this->addReference(self::TWEET_REFERENCE, $tweet);
			$this->addReference(self::TWEET_REFERENCE . $i, $tweet);
		}
    }

	public function getDependencies(): array
	{
		return [
			UserFixtures::class
		];
	}
}
