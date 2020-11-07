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
		for ($i = 0; $i < 30; $i++)
		{
			$tweet = $this->getReference(TweetFixtures::TWEET_REFERENCE . $i);
			for ($j = 0; $j < 10; $j++)
			{
				$user = $this->getReference(UserFixtures::USER_REFERENCE . rand(0, 29));

				$like = new Like();
				$like->setTweet($tweet);
				$like->setDate($faker->dateTime);
				$like->setUser($user);

				$manager->persist($like);
				$this->addReference(self::LIKE_REFERENCE . $i . $j, $like);
			}
		}
		$manager->flush();
	}

	public function getDependencies(): array
	{
		return [
			UserFixtures::class,
			TweetFixtures::class
		];
	}
}
