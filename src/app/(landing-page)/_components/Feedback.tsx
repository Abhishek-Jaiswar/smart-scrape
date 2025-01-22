import React from 'react';
import { Star, Heart, MessageCircle } from 'lucide-react';
import Image from 'next/image';

interface Review {
    id: number;
    author: string;
    avatar: string;
    rating: number;
    date: string;
    totalSpent: number;
    totalReviews: number;
    comment: string;
}

const reviews: Review[] = [
    {
        id: 1,
        author: "Towhidur Rahman",
        avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop",
        rating: 4,
        date: "24-10-2022",
        totalSpent: 200,
        totalReviews: 14,
        comment: "My first and only mala ordered on Etsy, and I'm beyond delighted! I requested a custom mala based on two stones I was called to invite together in this kind of creation. The fun and genuine joy I invite together in this kind of creation. The fun and genuine joy."
    },
    {
        id: 2,
        author: "Towhidur Rahman",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop",
        rating: 4,
        date: "24-10-2022",
        totalSpent: 200,
        totalReviews: 14,
        comment: "My first and only mala ordered on Etsy, and I'm beyond delighted! I requested a custom mala based on two stones I was called to invite together in this kind of creation. The fun and genuine joy I invite together in this kind of creation. The fun and genuine joy."
    },
    {
        id: 3,
        author: "Towhidur Rahman",
        avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop",
        rating: 4,
        date: "24-10-2022",
        totalSpent: 200,
        totalReviews: 14,
        comment: "My first and only mala ordered on Etsy, and I'm beyond delighted! I requested a custom mala based on two stones I was called to invite together in this kind of creation. The fun and genuine joy I invite together in this kind of creation. The fun and genuine joy."
    }
];

const StarRating = ({ rating }: { rating: number }) => {
    return (
        <div className="flex gap-1">
            {[...Array(5)].map((_, index) => (
                <Star
                    key={index}
                    size={16}
                    className={index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                />
            ))}
        </div>
    );
};

function Feedback() {
    return (
        <div className="min-h-screen bg-gray-50 ">
            <div className=" mx-auto bg-white rounded-xl shadow-sm p-8">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-2xl font-bold mb-2">Reviews</h1>
                        <div className="flex items-center gap-8">
                            <div>
                                <div className="text-2xl font-bold">10.0k</div>
                                <div className="text-sm text-gray-500">Total Reviews</div>
                                <div className="text-sm text-green-500">21% ↑</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold">4.0</div>
                                <div className="text-sm text-gray-500">Average Rating</div>
                                <StarRating rating={4} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-2 rounded-lg">
                        <div className="text-sm text-gray-500 mb-2">March 2021 - February 2022</div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="text-sm">5</span>
                                <div className="h-2 bg-green-500 rounded w-32"></div>
                                <span className="text-sm text-gray-500">2.0k</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm">4</span>
                                <div className="h-2 bg-green-400 rounded w-24"></div>
                                <span className="text-sm text-gray-500">1.0k</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm">3</span>
                                <div className="h-2 bg-yellow-400 rounded w-16"></div>
                                <span className="text-sm text-gray-500">500</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm">2</span>
                                <div className="h-2 bg-orange-400 rounded w-8"></div>
                                <span className="text-sm text-gray-500">200</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm">1</span>
                                <div className="h-2 bg-red-400 rounded w-4"></div>
                                <span className="text-sm text-gray-500">0k</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {reviews.map((review) => (
                        <div key={review.id} className="border-b pb-6">
                            <div className="flex gap-4">
                                <Image
                                    src="/logo.png"
                                    alt={review.author}
                                    width={12}
                                    height={12}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold">{review.author}</h3>
                                            <div className="text-sm text-gray-500">
                                                Total Spent: ${review.totalSpent} • Total Review: {review.totalReviews}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <StarRating rating={review.rating} />
                                            <span className="text-sm text-gray-500">{review.date}</span>
                                        </div>
                                    </div>
                                    <p className="mt-2 text-gray-600">{review.comment}</p>
                                    <div className="mt-4 flex gap-2">
                                        <button className="flex items-center gap-2 px-4 py-1.5 rounded-full border hover:bg-gray-50">
                                            <MessageCircle size={16} />
                                            <span>Public Comment</span>
                                        </button>
                                        <button className="flex items-center gap-2 px-4 py-1.5 rounded-full border hover:bg-gray-50">
                                            <MessageCircle size={16} />
                                            <span>Direct Message</span>
                                        </button>
                                        <button className="flex items-center gap-2 px-4 py-1.5 rounded-full border hover:bg-gray-50">
                                            <Heart size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Feedback;