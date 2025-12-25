"use client";
import { Complaint } from "@/hooks/useComplaints";
import useGalleryData from "@/hooks/useGalleryData";
import usePaginatedData from "@/hooks/usePaginatedData";
import { useGetAllActivitiesQuery } from "@/redux/features/activites/activitesApi";
import { useGetAllBlogsQuery } from "@/redux/features/blogs/blogApi";
import { useGetAllCommiteesQuery } from "@/redux/features/commitee/commiteeApi";
import { useGetAllDonationProjectsQuery } from "@/redux/features/donationProjects/donationProjectApi";
import { useGetGalleryQuery } from "@/redux/features/gallery/galleryApi";
import { useGetAllMembersQuery } from "@/redux/features/members/memberApi";
import { useGetAllVolunteersQuery } from "@/redux/features/volunteers/volunteersApi";
import {
  Users,
  DollarSign,
  BookOpen,
  Trophy,
  Shield,
  Camera,
  FileText
} from "lucide-react";

export default function AdminDashboard() {
  const { data: volunteers, error, isLoading } = useGetAllVolunteersQuery({})
  const { data: donateType } = useGetAllDonationProjectsQuery({})
  const { data: members } = useGetAllMembersQuery({})
  const { data: gallerydata } = useGetGalleryQuery({})
  const { data: advisors } = useGetAllCommiteesQuery({
    roleType: 'উপদেষ্টা',
  });
  const { data: Commitee } = useGetAllCommiteesQuery({
    roleType: 'পরিচালক',
  });

  const { data: complaints, loading, ref, refetch, total: complaintsTotal } = usePaginatedData<Complaint>({
    endpoint: "/complaint",
    limit: 20,
  });
  const { data: seceretdata, total: seceretdataTotal } = usePaginatedData({
    endpoint: "/secretdata",
    limit: 8,
  });
  const { data: successStories, total: successStoriesTotal } = usePaginatedData({
    endpoint: "/successdata",
    limit: 8,
  });
  //  Prepare dynamic stats
  const stats = [
    {
      title: "Total Payment",
      value: 0,
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Total successStories",
      value: successStoriesTotal || 0,
      trend: "up",
      icon: Trophy,
    },
    {
      title: "Totalcomplaints",
      value: complaintsTotal || 0,
      trend: "up",
      icon: FileText,
    },
    {
      title: "Total member",
      value: members?.meta?.total || 0,
      trend: "up",
      icon: Users,
    },
    {
      title: "Total seceretdata",
      value: seceretdataTotal || 0,
      trend: "up",
      icon: Shield,
    },
    {
      title: "Total Gallery Items",
      value: gallerydata?.meta?.total || 0,
      trend: "up",
      icon: Camera,
    },
    {
      title: "Total advisors",
      value: advisors?.meta?.total || 0,
      trend: "up",
      icon: Users,
    },
    {
      title: "Total Blog Posts",
      value: Commitee?.meta?.total || 0,
      trend: "up",
      icon: BookOpen,
    },
  ];

  return (
    <div className="p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Welcome back, Admin
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your foundation today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-card p-6 rounded-xl border border-border shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-card-foreground/10`}>
                  <Icon className={`w-6 h-6 text-foreground`} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-muted-foreground">
                {stat.title}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
