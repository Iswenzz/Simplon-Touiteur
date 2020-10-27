<?php

namespace App\DataFixtures;

use App\Entity\Country;
use App\Entity\Hashtag;
use App\Entity\Media;
use App\Entity\Tweet;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class UserFixtures extends Fixture
{
	public const USER_REFERENCE = "user-ref";

    public function load(ObjectManager $manager)
    {
		/**
		 * @var Country $country
		 */
		$faker = Factory::create("en_US");
        $user = new User();
        $country = $this->getReference(CountryFixtures::COUNTRY_REFERENCE);

        // Tweet
		$tweet = new Tweet();
		$tweet->setCreatedAt($faker->dateTime);
		$tweet->setContent($faker->text(100));

		// Hashtag
//		$hashtag = new Hashtag();
//		$hashtag->setDate($faker->dateTime);
//		$hashtag->setTweet($tweet);
//		$hashtag->setName($faker->name);
//		$tweet->addHashtag($hashtag);
//		$manager->persist($hashtag);

        // Media
//		$media = new Media();
//		$media->setTweet($tweet);
//		$media->setDate($faker->dateTime);
//		$media->setAuthor($user);
//		$media->setUrl($faker->imageUrl());
//		$manager->persist($media);

		// User
        $user->setLocation($country);
        $user->setName($faker->name);
        $user->setBio($faker->text(100));
        $user->setCreatedAt($faker->dateTime);
        $user->setBirthdate($faker->dateTime);
        $user->setEmail($faker->email);
        $user->setUsername($faker->userName);
//        $user->setAvatar($media);
//        $user->setBanner($media);
		$tweet->setAuthor($user);

		$manager->persist($tweet);
		$manager->persist($user);
        $manager->flush();
		$this->addReference(self::USER_REFERENCE, $user);
    }
}
