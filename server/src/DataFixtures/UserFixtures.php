<?php

namespace App\DataFixtures;

use App\Entity\Country;
use App\Entity\Hashtag;
use App\Entity\Media;
use App\Entity\Tweet;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class UserFixtures extends Fixture implements DependentFixtureInterface
{
	public const USER_REFERENCE = "user-ref";

    public function load(ObjectManager $manager): void
    {
		/**
		 * @var Country $country
		 */
		$faker = Factory::create("en_US");

		for ($i = 0; $i < 30; $i++)
		{
			$user = new User();
			$country = $this->getReference(CountryFixtures::COUNTRY_REFERENCE . $i);

			$user->setLocation($country);
			$user->setName($faker->name);
			$user->setBio($faker->realText(100));
			$user->setCreatedAt($faker->dateTime);
			$user->setBirthdate($faker->dateTime);
			$user->setEmail($faker->email);
			$user->setUsername($faker->userName);
			$user->setPassword($faker->password);

			$manager->persist($user);
			$manager->flush();
			if (!$this->hasReference(self::USER_REFERENCE))
				$this->addReference(self::USER_REFERENCE, $user);
			$this->addReference(self::USER_REFERENCE . $i, $user);
		}
    }

	public function getDependencies(): array
	{
		return [
			CountryFixtures::class
		];
	}
}
