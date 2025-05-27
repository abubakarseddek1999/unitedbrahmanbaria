// Local Storage utility functions for data management

export interface Complaint {
  id: number
  title: string
  description: string
  name: string
  hideName: boolean
  image?: string
  dateSubmitted: string
  status: string
}

export interface SpotInfo {
  id: number
  subject: string
  description: string
  location: string
  imageOrVideo?: string
  submitterType: string
  hideIdentity: boolean
  dateSubmitted: string
  status: string
}

export interface SuccessStory {
  id: number
  title: string
  description: string
  image?: string
  dateAdded: string
}

export interface GalleryItem {
  id: number
  mediaType: "image" | "video"
  url: string
  caption: string
  dateUploaded: string
}

// Initialize default data
const defaultComplaints: Complaint[] = [
  {
    id: 1,
    title: "রাস্তার গর্ত সমস্যা",
    description: "প্রধান সড়কে বড় গর্ত রয়েছে যা যানবাহন চলাচলে সমস্যা সৃষ্টি করছে।",
    name: "গোপনীয়",
    hideName: true,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    dateSubmitted: "২০২৪-০১-২০",
    status: "পর্যালোচনাধীন",
  },
  {
    id: 2,
    title: "পানি সরবরাহ সমস্যা",
    description: "এলাকায় নিয়মিত পানি সরবরাহ হচ্ছে না। সপ্তাহে মাত্র ২-৩ দিন পানি পাওয়া যায়।",
    name: "মোহাম্মদ করিম",
    hideName: false,
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=300&h=200&fit=crop",
    dateSubmitted: "২০২৪-০১-১৮",
    status: "সমাধানাধীন",
  },
  {
    id: 3,
    title: "বিদ্যুৎ সংযোগ সমস্যা",
    description: "নতুন বাড়িতে বিদ্যুৎ সংযোগের জন্য আবেদন করেছি কিন্তু ৩ মাস হয়ে গেছে কোনো সাড়া নেই।",
    name: "গোপনীয়",
    hideName: true,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
    dateSubmitted: "২০২৪-০১-১৫",
    status: "নতুন",
  },
]

const defaultSpotInfos: SpotInfo[] = [
  {
    id: 1,
    subject: "দুর্নীতি সংক্রান্ত তথ্য",
    description: "স্থানীয় অফিসে অনিয়ম হচ্ছে। কর্মকর্তারা অতিরিক্ত টাকা দাবি করছেন।",
    location: "সদর উপজেলা",
    submitterType: "প্রত্যক্ষদর্শী",
    hideIdentity: true,
    dateSubmitted: "২০২৪-০১-১৯",
    status: "নতুন",
  },
  {
    id: 2,
    subject: "ভুয়া সার্টিফিকেট প্রদান",
    description: "কিছু ব্যক্তি ভুয়া সার্টিফিকেট তৈরি করে বিক্রি করছে।",
    location: "ব্রাহ্মণবাড়িয়া সদর",
    submitterType: "ভুক্তভোগী",
    hideIdentity: true,
    dateSubmitted: "২০২৪-০১-১৭",
    status: "পর্যালোচনাধীন",
  },
]

const defaultSuccessStories: SuccessStory[] = [
  {
    id: 1,
    title: "রাস্তার গর্ত মেরামত",
    description: "স্থানীয় বাসিন্দাদের অভিযোগের পর প্রধান সড়কের গর্তগুলো মেরামত করা হয়েছে।",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=250&fit=crop",
    dateAdded: "২০২৪-০১-১৫",
  },
  {
    id: 2,
    title: "দুর্নীতি প্রতিরোধ",
    description: "গোপন তথ্যের ভিত্তিতে স্থানীয় দুর্নীতি বন্ধ করা হয়েছে।",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=250&fit=crop",
    dateAdded: "২০২৪-০১-১০",
  },
  {
    id: 3,
    title: "পানি সরবরাহ উন্নতি",
    description: "জনগণের অভিযোগের পর এলাকায় নতুন পানির লাইন স্থাপন করা হয়েছে।",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=250&fit=crop",
    dateAdded: "২০২৪-০১-০৫",
  },
]

const defaultGalleryItems: GalleryItem[] = [
  {
    id: 1,
    mediaType: "image",
    url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
    caption: "সমাবেশের ছবি",
    dateUploaded: "২০২৪-০১-১০",
  },
  {
    id: 2,
    mediaType: "image",
    url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
    caption: "উন্নয়ন কাজ",
    dateUploaded: "২০২৪-০১-০৮",
  },
  {
    id: 3,
    mediaType: "image",
    url: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=300&fit=crop",
    caption: "জনসভা",
    dateUploaded: "২০২৪-০১-০৫",
  },
  {
    id: 4,
    mediaType: "image",
    url: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300&fit=crop",
    caption: "সেবা কার্যক্রম",
    dateUploaded: "২০২৪-০১-০৩",
  },
  {
    id: 5,
    mediaType: "image",
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
    caption: "স্থানীয় উন্নয়ন",
    dateUploaded: "২০২৪-০১-০১",
  },
  {
    id: 6,
    mediaType: "image",
    url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop",
    caption: "সামাজিক কাজ",
    dateUploaded: "২০২৩-১২-২৮",
  },
]

// Utility functions
const isClient = typeof window !== "undefined"

export const initializeData = () => {
  if (!isClient) return

  // Initialize complaints
  if (!localStorage.getItem("complaints")) {
    localStorage.setItem("complaints", JSON.stringify(defaultComplaints))
  }

  // Initialize spot infos
  if (!localStorage.getItem("spotInfos")) {
    localStorage.setItem("spotInfos", JSON.stringify(defaultSpotInfos))
  }

  // Initialize success stories
  if (!localStorage.getItem("successStories")) {
    localStorage.setItem("successStories", JSON.stringify(defaultSuccessStories))
  }

  // Initialize gallery items
  if (!localStorage.getItem("galleryItems")) {
    localStorage.setItem("galleryItems", JSON.stringify(defaultGalleryItems))
  }
}

// Complaints CRUD operations
export const getComplaints = (): Complaint[] => {
  if (!isClient) return defaultComplaints
  const data = localStorage.getItem("complaints")
  return data ? JSON.parse(data) : defaultComplaints
}

export const addComplaint = (complaint: Omit<Complaint, "id" | "dateSubmitted" | "status">): void => {
  if (!isClient) return
  const complaints = getComplaints()
  const newComplaint: Complaint = {
    ...complaint,
    id: Date.now(),
    dateSubmitted: new Date().toLocaleDateString("bn-BD"),
    status: "নতুন",
  }
  complaints.unshift(newComplaint)
  localStorage.setItem("complaints", JSON.stringify(complaints))
}

export const updateComplaintStatus = (id: number, status: string): void => {
  if (!isClient) return
  const complaints = getComplaints()
  const updatedComplaints = complaints.map((complaint) => (complaint.id === id ? { ...complaint, status } : complaint))
  localStorage.setItem("complaints", JSON.stringify(updatedComplaints))
}

export const deleteComplaint = (id: number): void => {
  if (!isClient) return
  const complaints = getComplaints()
  const filteredComplaints = complaints.filter((complaint) => complaint.id !== id)
  localStorage.setItem("complaints", JSON.stringify(filteredComplaints))
}

// Spot Info CRUD operations
export const getSpotInfos = (): SpotInfo[] => {
  if (!isClient) return defaultSpotInfos
  const data = localStorage.getItem("spotInfos")
  return data ? JSON.parse(data) : defaultSpotInfos
}

export const addSpotInfo = (spotInfo: Omit<SpotInfo, "id" | "dateSubmitted" | "status">): void => {
  if (!isClient) return
  const spotInfos = getSpotInfos()
  const newSpotInfo: SpotInfo = {
    ...spotInfo,
    id: Date.now(),
    dateSubmitted: new Date().toLocaleDateString("bn-BD"),
    status: "নতুন",
  }
  spotInfos.unshift(newSpotInfo)
  localStorage.setItem("spotInfos", JSON.stringify(spotInfos))
}

export const updateSpotInfoStatus = (id: number, status: string): void => {
  if (!isClient) return
  const spotInfos = getSpotInfos()
  const updatedSpotInfos = spotInfos.map((info) => (info.id === id ? { ...info, status } : info))
  localStorage.setItem("spotInfos", JSON.stringify(updatedSpotInfos))
}

export const deleteSpotInfo = (id: number): void => {
  if (!isClient) return
  const spotInfos = getSpotInfos()
  const filteredSpotInfos = spotInfos.filter((info) => info.id !== id)
  localStorage.setItem("spotInfos", JSON.stringify(filteredSpotInfos))
}

// Success Stories CRUD operations
export const getSuccessStories = (): SuccessStory[] => {
  if (!isClient) return defaultSuccessStories
  const data = localStorage.getItem("successStories")
  return data ? JSON.parse(data) : defaultSuccessStories
}

export const addSuccessStory = (story: Omit<SuccessStory, "id" | "dateAdded">): void => {
  if (!isClient) return
  const stories = getSuccessStories()
  const newStory: SuccessStory = {
    ...story,
    id: Date.now(),
    dateAdded: new Date().toLocaleDateString("bn-BD"),
  }
  stories.unshift(newStory)
  localStorage.setItem("successStories", JSON.stringify(stories))
}

export const updateSuccessStory = (id: number, story: Partial<SuccessStory>): void => {
  if (!isClient) return
  const stories = getSuccessStories()
  const updatedStories = stories.map((s) => (s.id === id ? { ...s, ...story } : s))
  localStorage.setItem("successStories", JSON.stringify(updatedStories))
}

export const deleteSuccessStory = (id: number): void => {
  if (!isClient) return
  const stories = getSuccessStories()
  const filteredStories = stories.filter((story) => story.id !== id)
  localStorage.setItem("successStories", JSON.stringify(filteredStories))
}

// Gallery CRUD operations
export const getGalleryItems = (): GalleryItem[] => {
  if (!isClient) return defaultGalleryItems
  const data = localStorage.getItem("galleryItems")
  return data ? JSON.parse(data) : defaultGalleryItems
}

export const addGalleryItem = (item: Omit<GalleryItem, "id" | "dateUploaded">): void => {
  if (!isClient) return
  const items = getGalleryItems()
  const newItem: GalleryItem = {
    ...item,
    id: Date.now(),
    dateUploaded: new Date().toLocaleDateString("bn-BD"),
  }
  items.unshift(newItem)
  localStorage.setItem("galleryItems", JSON.stringify(items))
}

export const deleteGalleryItem = (id: number): void => {
  if (!isClient) return
  const items = getGalleryItems()
  const filteredItems = items.filter((item) => item.id !== id)
  localStorage.setItem("galleryItems", JSON.stringify(filteredItems))
}

// Admin authentication
export const isAdminLoggedIn = (): boolean => {
  if (!isClient) return false
  return localStorage.getItem("adminLoggedIn") === "true"
}

export const setAdminLoggedIn = (status: boolean): void => {
  if (!isClient) return
  localStorage.setItem("adminLoggedIn", status.toString())
}

// Get current Bengali date
export const getCurrentBengaliDate = (): string => {
  const date = new Date()
  return date.toLocaleDateString("bn-BD")
}
