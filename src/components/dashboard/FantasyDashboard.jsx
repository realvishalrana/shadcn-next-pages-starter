'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Trophy,
  Clock,
  Users,
  TrendingUp,
  Star,
  ArrowRight,
  Plus,
} from 'lucide-react';

const FantasyDashboard = () => {
  const upcomingMatches = [
    {
      id: 1,
      teams: ['RWA', 'KEN'],
      teamNames: ['Rwanda', 'Kenya'],
      tournament: 'Africa T20 Continent Cup',
      timeLeft: '10m 40s',
      prizePool: '₹85 Lakhs',
      status: 'Lineup Out',
      isLive: false,
      delay: 'Rain Delay 30 min',
    },
    {
      id: 2,
      teams: ['KRS', 'ALS'],
      teamNames: ['Kristianstad CC', 'Alby Zalmi CF'],
      tournament: 'FanCode ECS Sweden T10',
      timeLeft: '10m 40s',
      prizePool: '₹1.9 Crores',
      status: 'Lineup Out',
      isLive: false,
    },
    {
      id: 3,
      teams: ['SCO', 'USA'],
      teamNames: ['Sri Lanka', 'USA'],
      tournament: "ACC Women's Emerging T20",
      timeLeft: '15 Jun 12:30 PM',
      prizePool: '₹25k',
      status: 'Lineup Out',
      isLive: false,
    },
  ];

  const contests = [
    {
      id: 1,
      name: 'Mega Contest',
      prizePool: '₹3,000+',
      spotsLeft: 350,
      totalSpots: 499,
      entryFee: '₹34',
      type: 'Guaranteed',
      details: {
        firstPrize: '₹4k',
        winRate: '45.09%',
        teams: '15 Teams',
        commission: '5%',
      },
    },
    {
      id: 2,
      name: 'Win Contest',
      prizePool: '₹2,000',
      spotsLeft: 25,
      totalSpots: 25,
      entryFee: '₹99',
      originalFee: '₹149',
      type: 'Flexible',
      details: {
        firstPrize: '₹1k',
        winRate: '24%',
        teams: '10 Teams',
      },
    },
    {
      id: 3,
      name: 'Small Entry',
      prizePool: '₹500',
      spotsLeft: 3,
      totalSpots: 4,
      entryFee: '₹19',
      type: 'Guaranteed',
      details: {
        firstPrize: '₹200',
        winRate: '75%',
        teams: '2 Teams',
      },
    },
  ];

  return (
    <div className="space-y-6">
      {/* Sports Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {['Cricket', 'Soccer', 'Basketball'].map(sport => (
          <button
            key={sport}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              sport === 'Cricket'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {sport}
          </button>
        ))}
      </div>

      {/* Upcoming Matches */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg lg:text-xl font-bold text-gray-900">
            Upcoming Matches
          </h2>
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            View All <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {upcomingMatches.map(match => (
            <Card key={match.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {match.tournament}
                  </Badge>
                  {match.delay && (
                    <Badge variant="destructive" className="text-xs">
                      {match.delay}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🏏</span>
                    <span>
                      {match.teams[0]} vs {match.teams[1]}
                    </span>
                  </div>
                </CardTitle>
                <CardDescription>
                  {match.teamNames[0]} vs {match.teamNames[1]}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {match.timeLeft}
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-green-600 border-green-600"
                    >
                      <Trophy className="w-3 h-3 mr-1" />
                      {match.prizePool}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {match.status}
                    </Badge>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Join Contest
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Contests */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-3 sm:space-y-0">
          <div className="flex flex-wrap gap-1">
            {['All Contests', 'My Contests (0)', 'My Teams (0)'].map(
              (tab, index) => (
                <button
                  key={tab}
                  className={`px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                    index === 0
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab}
                </button>
              )
            )}
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Create Private Contest
          </Button>
        </div>

        <div className="space-y-4">
          {contests.map(contest => (
            <Card
              key={contest.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
                      <h3 className="text-lg font-semibold">{contest.name}</h3>
                      <Badge
                        variant={
                          contest.type === 'Guaranteed'
                            ? 'default'
                            : 'secondary'
                        }
                        className="text-xs w-fit"
                      >
                        {contest.type}
                      </Badge>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Trophy className="w-4 h-4" />
                        <span>Prize Pool {contest.prizePool}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{contest.spotsLeft} Spots left!</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="w-4 h-4" />
                        <span>{contest.details.winRate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:flex-col sm:text-right sm:space-y-2">
                    <div className="text-xl sm:text-2xl font-bold text-blue-600">
                      {contest.entryFee}
                      {contest.originalFee && (
                        <span className="text-sm text-gray-400 line-through ml-2">
                          {contest.originalFee}
                        </span>
                      )}
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                      Join Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-6">
          <Button variant="outline">
            View all (10) <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FantasyDashboard;
