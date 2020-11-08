<?php

namespace App\DataFixtures;

use App\Entity\Media;
use App\Entity\Tweet;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class MediaFixtures extends Fixture implements DependentFixtureInterface
{
	public const MEDIA_REFERENCE = "media-ref";

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
			$user = $this->getReference(UserFixtures::USER_REFERENCE . $i);

			$media = new Media();
			$media->setTweet($tweet);
			$media->setDate($faker->dateTime);
			$media->setAuthor($user);
			$media->setUrl($faker->imageUrl());

			$manager->persist($media);
			if ($this->hasReference(self::MEDIA_REFERENCE))
				$this->addReference(self::MEDIA_REFERENCE, $media);
			$this->addReference(self::MEDIA_REFERENCE . $i, $media);
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
