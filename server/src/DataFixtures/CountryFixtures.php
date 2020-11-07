<?php

namespace App\DataFixtures;

use App\Entity\Country;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class CountryFixtures extends Fixture
{
	public const COUNTRY_REFERENCE = "country-ref";

    public function load(ObjectManager $manager): void
    {
		$faker = Factory::create("en_US");
		for ($i = 0; $i < 100; $i++)
		{
			$country = new Country();
			$country->setName($faker->country);
			$country->setCode($faker->randomDigit);

			$manager->persist($country);
			if (!$this->hasReference(self::COUNTRY_REFERENCE))
				$this->addReference(self::COUNTRY_REFERENCE, $country);
			$this->addReference(self::COUNTRY_REFERENCE . $i, $country);
		}
		$manager->flush();
    }
}
