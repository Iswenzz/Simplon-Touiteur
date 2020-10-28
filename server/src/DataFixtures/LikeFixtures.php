<?php

namespace App\DataFixtures;

use App\Entity\Like;
use App\Entity\Tweet;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class LikeFixtures extends Fixture implements DependentFixtureInterface
{
	public const LIKE_REFERENCE = "like-ref";

	public function load(ObjectManager $manager): void
	{
		/**
		 * @var Tweet $tweet
		 * @var User $user
		 */
		$faker = Factory::create("en_US");
		$tweet = $this->getReference(TweetFixtures::TWEET_REFERENCE);
		$user = $this->getReference(UserFixtures::USER_REFERENCE);

		$like = new Like();
		$like->setTweet($tweet);
		$like->setDate($faker->dateTime);
		$like->setUser($user);

		$manager->persist($like);
		$manager->flush();
		$this->addReference(self::LIKE_REFERENCE, $like);
	}

	public function getDependencies(): array
	{
		return [
			UserFixtures::class,
			TweetFixtures::class
		];
	}
}
