import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Rohit Sharma', role:'Batsman', bats:'Right-hand bat', bowl:'Right-arm offbreak' },
      { id: 12, name: 'Shikhar Dhawan', role:'Batsman', bats:'Left-hand bat', bowl:'N/A' },
      { id: 13, name: 'Virat Kohli (C)', role:'Batsman', bats:'Right-hand bat', bowl:'Right-arm medium' },
      { id: 14, name: 'M S Dhoni (WK)', role:'Batsman', bats:'Right-hand bat', bowl:'Right-arm medium' },
      { id: 15, name: 'Ajinkya Rahane', role:'Batsman', bats:'Right-hand bat', bowl:'N/A' },
      { id: 16, name: 'Kedar Jadhav', role:'All-rounder', bats:'Right-hand bat', bowl:'Right-arm slinger' },
      { id: 17, name: 'Hardik Pandya', role:'All-rounder', bats:'Right-hand bat', bowl:'Right-arm medium-fast' },
      { id: 18, name: 'Axar Patel', role:'Bowler', bats:'Left-hand bat', bowl:'Left-arm orthodox spin' },
      { id: 19, name: 'Bhuvneshwar Kumar', role:'Bowler', bats:'Right-hand bat', bowl:'Right-arm fast' },
      { id: 20, name: 'Jasprit Bumrah', role:'Bowler', bats:'Right-hand bat', bowl:'Right-arm fast' },
      { id: 21, name: 'Yuzvendra Chahal', role:'Bowler', bats:'Right-hand bat', bowl:'Right-arm leg-spin' }
    ];
    return {heroes};
  }
}