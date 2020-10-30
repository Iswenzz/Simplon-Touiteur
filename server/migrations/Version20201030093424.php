<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201030093424 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE comment (id INT AUTO_INCREMENT NOT NULL, tweet_id INT DEFAULT NULL, author_id INT DEFAULT NULL, content VARCHAR(140) NOT NULL, date DATETIME NOT NULL, INDEX IDX_9474526C1041E39B (tweet_id), INDEX IDX_9474526CF675F31B (author_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE country (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, code INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE follower (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, follow_id INT DEFAULT NULL, date DATETIME NOT NULL, INDEX IDX_B9D60946A76ED395 (user_id), UNIQUE INDEX UNIQ_B9D609468711D3BC (follow_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE following (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, following_id INT DEFAULT NULL, date DATETIME NOT NULL, INDEX IDX_71BF8DE3A76ED395 (user_id), UNIQUE INDEX UNIQ_71BF8DE31816E3A3 (following_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE hashtag (id INT AUTO_INCREMENT NOT NULL, tweet_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, date DATETIME NOT NULL, INDEX IDX_5AB52A611041E39B (tweet_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `like` (id INT AUTO_INCREMENT NOT NULL, tweet_id INT DEFAULT NULL, user_id INT DEFAULT NULL, date DATETIME NOT NULL, INDEX IDX_AC6340B31041E39B (tweet_id), INDEX IDX_AC6340B3A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE media (id INT AUTO_INCREMENT NOT NULL, tweet_id INT DEFAULT NULL, author_id INT DEFAULT NULL, url VARCHAR(255) NOT NULL, date DATETIME NOT NULL, UNIQUE INDEX UNIQ_6A2CA10C1041E39B (tweet_id), UNIQUE INDEX UNIQ_6A2CA10CF675F31B (author_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE retweet (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, tweet_id INT DEFAULT NULL, date DATETIME NOT NULL, INDEX IDX_45E67DB3A76ED395 (user_id), INDEX IDX_45E67DB31041E39B (tweet_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE tweet (id INT AUTO_INCREMENT NOT NULL, author_id INT DEFAULT NULL, content VARCHAR(140) NOT NULL, created_at DATETIME NOT NULL, INDEX IDX_3D660A3BF675F31B (author_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, location_id INT DEFAULT NULL, username VARCHAR(255) NOT NULL, bio VARCHAR(255) DEFAULT NULL, name VARCHAR(255) DEFAULT NULL, email VARCHAR(255) NOT NULL, birthdate DATETIME DEFAULT NULL, created_at DATETIME NOT NULL, UNIQUE INDEX UNIQ_8D93D64964D218E (location_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526C1041E39B FOREIGN KEY (tweet_id) REFERENCES tweet (id)');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526CF675F31B FOREIGN KEY (author_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE follower ADD CONSTRAINT FK_B9D60946A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE follower ADD CONSTRAINT FK_B9D609468711D3BC FOREIGN KEY (follow_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE following ADD CONSTRAINT FK_71BF8DE3A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE following ADD CONSTRAINT FK_71BF8DE31816E3A3 FOREIGN KEY (following_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE hashtag ADD CONSTRAINT FK_5AB52A611041E39B FOREIGN KEY (tweet_id) REFERENCES tweet (id)');
        $this->addSql('ALTER TABLE `like` ADD CONSTRAINT FK_AC6340B31041E39B FOREIGN KEY (tweet_id) REFERENCES tweet (id)');
        $this->addSql('ALTER TABLE `like` ADD CONSTRAINT FK_AC6340B3A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE media ADD CONSTRAINT FK_6A2CA10C1041E39B FOREIGN KEY (tweet_id) REFERENCES tweet (id)');
        $this->addSql('ALTER TABLE media ADD CONSTRAINT FK_6A2CA10CF675F31B FOREIGN KEY (author_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE retweet ADD CONSTRAINT FK_45E67DB3A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE retweet ADD CONSTRAINT FK_45E67DB31041E39B FOREIGN KEY (tweet_id) REFERENCES tweet (id)');
        $this->addSql('ALTER TABLE tweet ADD CONSTRAINT FK_3D660A3BF675F31B FOREIGN KEY (author_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D64964D218E FOREIGN KEY (location_id) REFERENCES country (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D64964D218E');
        $this->addSql('ALTER TABLE comment DROP FOREIGN KEY FK_9474526C1041E39B');
        $this->addSql('ALTER TABLE hashtag DROP FOREIGN KEY FK_5AB52A611041E39B');
        $this->addSql('ALTER TABLE `like` DROP FOREIGN KEY FK_AC6340B31041E39B');
        $this->addSql('ALTER TABLE media DROP FOREIGN KEY FK_6A2CA10C1041E39B');
        $this->addSql('ALTER TABLE retweet DROP FOREIGN KEY FK_45E67DB31041E39B');
        $this->addSql('ALTER TABLE comment DROP FOREIGN KEY FK_9474526CF675F31B');
        $this->addSql('ALTER TABLE follower DROP FOREIGN KEY FK_B9D60946A76ED395');
        $this->addSql('ALTER TABLE follower DROP FOREIGN KEY FK_B9D609468711D3BC');
        $this->addSql('ALTER TABLE following DROP FOREIGN KEY FK_71BF8DE3A76ED395');
        $this->addSql('ALTER TABLE following DROP FOREIGN KEY FK_71BF8DE31816E3A3');
        $this->addSql('ALTER TABLE `like` DROP FOREIGN KEY FK_AC6340B3A76ED395');
        $this->addSql('ALTER TABLE media DROP FOREIGN KEY FK_6A2CA10CF675F31B');
        $this->addSql('ALTER TABLE retweet DROP FOREIGN KEY FK_45E67DB3A76ED395');
        $this->addSql('ALTER TABLE tweet DROP FOREIGN KEY FK_3D660A3BF675F31B');
        $this->addSql('DROP TABLE comment');
        $this->addSql('DROP TABLE country');
        $this->addSql('DROP TABLE follower');
        $this->addSql('DROP TABLE following');
        $this->addSql('DROP TABLE hashtag');
        $this->addSql('DROP TABLE `like`');
        $this->addSql('DROP TABLE media');
        $this->addSql('DROP TABLE retweet');
        $this->addSql('DROP TABLE tweet');
        $this->addSql('DROP TABLE user');
    }
}
