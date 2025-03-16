"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Loader2, AlertCircle } from "lucide-react";


interface LeetCodeUserProfile {
  username: string;
  ranking: number;
  totalSolved: number;
  rating: number;
}

interface SolvedStats {
  solvedProblem: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
}

export const LeetCodeCard = () => {
  const [stats, setStats] = useState<LeetCodeUserProfile | null>(null);
  const [solvedStats, setSolvedStats] = useState<SolvedStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const username = "satyambindhani25";
  const API_BASE_URL = "https://alfa-leetcode-api.onrender.com";

  useEffect(() => {
    const fetchLeetCodeStats = async () => {
      const localStats = JSON.parse(localStorage.getItem("lcStats") || "{}");
      if (localStats?.timestamp) {
        const prevFetch = localStats.timestamp;
        const currentFetch = Date.now();
        const diff = currentFetch - prevFetch;
        if (diff < 1000 * 60 * 60 * 24 * 7) {
          // Use cached stats if within 7 days
          setStats(localStats.profile);
          setSolvedStats(localStats.solved);
          setLoading(false);
          return;
        }
      }
      try {
        const [profileRes, contestRes, solvedRes] = await Promise.all([
          fetch(`${API_BASE_URL}/userProfile/${username}`),
          fetch(`${API_BASE_URL}/${username}/contest`),
          fetch(`${API_BASE_URL}/${username}/solved`),
        ]);

        if (!profileRes.ok || !contestRes.ok || !solvedRes.ok) {
          throw new Error("Failed to fetch LeetCode stats");
        }

        const profileData = await profileRes.json();
        const contestData = await contestRes.json();
        const solvedData = await solvedRes.json();

        console.log(profileData);
        console.log(solvedData);

        const newStats = {
          username: username,
          ranking: profileData.ranking,
          totalSolved: profileData?.totalSolved,
          rating: contestData?.contestRating,
        };

        const newSolvedStats = {
          solvedProblem: solvedData.solvedProblem,
          easySolved: solvedData.easySolved,
          mediumSolved: solvedData.mediumSolved,
          hardSolved: solvedData.hardSolved,
        };
        setStats(newStats);
        setSolvedStats(newSolvedStats);

        localStorage.setItem(
          "lcStats",
          JSON.stringify({
            profile: newStats,
            solved: newSolvedStats,
            timestamp: Date.now(),
          })
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch stats");
      } finally {
        setLoading(false);
      }
    };

    fetchLeetCodeStats();
  }, [username]);

  if (loading) {
    return (
      <Card className="p-4 rounded-2xl bg-second-1 border-none text-white min-h-[160px] flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
      </Card>
    );
  }
  const totalProblems = 3087;
  if (error || !stats || !solvedStats) {
    return (
      <Card className="p-4 bg-second-1 text-white min-h-[160px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <AlertCircle className="w-6 h-6 text-red-400" />
          <span className="text-sm text-red-400">Failed to load stats</span>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 border-none rounded-2xl transition-all duration-300 bg-gray-800 text-white shadow-xl relative">
      {/* Circular Chart and Difficulty Stats */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-md">
        
        {/* Circle Chart Section */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            {/* Circular Chart */}
            <svg width="120" height="120" viewBox="0 0 36 36" className="circular-chart">
              <path
                className="circle-bg"
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#2d3748"
                strokeWidth="2"
              />
              <path
                className="circle"
                strokeDasharray={`${(solvedStats.solvedProblem / totalProblems) * 100}, 100`}
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#48bb78"
                strokeWidth="2"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-3xl font-bold">{solvedStats.solvedProblem}</p>
              <p className="text-sm text-gray-400">/{totalProblems} Solved</p>
            </div>
          </div>
        </div>

        {/* Difficulty Stats Section */}
        <div className="flex flex-col gap-2 mt-4 sm:mt-0 sm:ml-6">
          {/* Easy */}
          <div className={`flex items-center justify-between bg-gray-700 p-2 rounded-md w-full`}>
            <span className={`text-green-400 font-medium`}>Easy</span>
            <span>{`${solvedStats.easySolved}/866`}</span>
          </div>
          
          {/* Medium */}
          <div className={`flex items-center justify-between bg-gray-700 p-2 rounded-md w-full`}>
            <span className={`text-yellow-400 font-medium`}>Med.</span>
            <span>{`${solvedStats.mediumSolved}/1813`}</span>
          </div>
          
          {/* Hard */}
          <div className={`flex items-center justify-between bg-gray-700 p-2 rounded-md w-full`}>
            <span className={`text-red-400 font-medium`}>Hard</span>
            <span>{`${solvedStats.hardSolved}/811`}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-4 sm:mt-0 sm:ml-6">
  {/* Ranking */}
  <div className="flex items-center justify-between bg-gray-700 p-2 rounded-md w-full">
    <span className="text-blue-400 font-medium">Ranking</span>
    <span>{`${stats.ranking}`}</span>
  </div>

  {/* Rating */}
  <div className="flex items-center justify-between bg-gray-700 p-2 rounded-md w-full">
    <span className="text-purple-400 font-medium">Rating</span>
    <span>{`${stats.rating}`}</span>
  </div>
</div>
      </div>
    </Card>
  );
};

export default LeetCodeCard;
