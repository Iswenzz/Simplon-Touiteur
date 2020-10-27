<?php

namespace App\DataFixtures;

use App\Entity\Media;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class MediaFixtures extends Fixture
{
	public const MEDIA_REFERENCE = "media-ref";

    public function load(ObjectManager $manager)
    {
		$faker = Factory::create("en_US");
        $media = new Media();
        $media->setTweet(null);
        $media->setDate($faker->dateTime);
        $media->setAuthor(null);
        $media->setUrl($faker->imageUrl());

		$manager->persist($media);
		$manager->flush();
		$this->addReference(self::MEDIA_REFERENCE, $media);
    }
}
