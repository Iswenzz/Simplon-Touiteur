<?php

namespace App\DataFixtures;

use App\Entity\Retweet;
use App\Entity\Tweet;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class RetweetFixtures extends Fixture implements DependentFixtureInterface
{
	public const RETWEET_REFERENCE = "retweet-ref";

	public function load(ObjectManager $manager): void
	{
		/**
		 * @var Tweet $tweet
		 * @var User $user
		 */
		$faker = Factory::create("en_US");
		$tweet = $this->getReference(TweetFixtures::TWEET_REFERENCE);
		$user = $this->getReference(UserFixtures::USER_REFERENCE);

		$retweet = new Retweet();
		$retweet->setTweet($tweet);
		$retweet->setDate($faker->dateTime);
		$retweet->setUser($user);

		$manager->persist($retweet);
		$manager->flush();
		$this->addReference(self::RETWEET_REFERENCE, $retweet);
	}

	public function getDependencies(): array
	{
		return [
			UserFixtures::class,
			TweetFixtures::class
		];
	}
}
