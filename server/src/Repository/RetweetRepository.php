<?php

namespace App\Repository;

use App\Entity\Retweet;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Retweet|null find($id, $lockMode = null, $lockVersion = null)
 * @method Retweet|null findOneBy(array $criteria, array $orderBy = null)
 * @method Retweet[]    findAll()
 * @method Retweet[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class RetweetRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Retweet::class);
    }

    // /**
    //  * @return Retweet[] Returns an array of Retweet objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('r.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Retweet
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
