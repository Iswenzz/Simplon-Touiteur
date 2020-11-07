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
		$user = $this->getReference(UserFixtures::USER_REFERENCE);

		// Comment
		$tweet = new Tweet();
		$tweet->setAuthor($user);
		$tweet->setCreatedAt($faker->dateTime);
		$tweet->setContent($faker->text(100));

		$manager->persist($tweet);
        $manager->flush();
        $this->addReference(self::TWEET_REFERENCE, $tweet);
    }

	public function getDependencies(): array
	{
		return [
			UserFixtures::class
		];
	}
}
