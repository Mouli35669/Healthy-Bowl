import React from 'react';

const SkeletonElement: React.FC<{ className: string }> = ({ className }) => (
    <div className={`${className} bg-slate-200/80 dark:bg-slate-800/80 rounded relative overflow-hidden shimmer`}></div>
);


const SkeletonHeader: React.FC = () => (
    <div className="p-4 flex justify-between items-center border-b border-slate-200/80 dark:border-white/10">
        <div className="flex items-center gap-3">
            <SkeletonElement className="w-10 h-10 rounded-full" />
            <div className="space-y-2">
                <SkeletonElement className="h-4 w-32" />
                <SkeletonElement className="h-3 w-24" />
            </div>
        </div>
        <div className="hidden md:flex items-center gap-4">
            <SkeletonElement className="h-8 w-16 rounded-md" />
            <SkeletonElement className="h-8 w-16 rounded-md" />
            <SkeletonElement className="h-8 w-16 rounded-md" />
            <SkeletonElement className="w-10 h-10 rounded-full" />
        </div>
    </div>
);

const SkeletonBanner: React.FC = () => (
    <div className="p-6 m-4 md:m-0">
        <SkeletonElement className="h-40 rounded-2xl" />
    </div>
);

const SkeletonPlanCard: React.FC = () => (
    <div className="border border-slate-200/80 dark:border-white/10 rounded-2xl shadow-lg overflow-hidden">
        <SkeletonElement className="p-6 h-48" />
        <div className="p-6 space-y-4">
            <SkeletonElement className="h-4 w-3/4 rounded" />
            <SkeletonElement className="h-3 w-full rounded" />
            <SkeletonElement className="h-3 w-1/2 rounded" />
            <div className="flex gap-3 pt-4">
                <SkeletonElement className="h-12 w-full rounded-lg" />
                <SkeletonElement className="h-12 w-full rounded-lg" />
            </div>
        </div>
    </div>
);

const SkeletonBottomNav: React.FC = () => (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white/80 dark:bg-black/30 backdrop-blur-lg border-t border-slate-200/80 dark:border-white/10 md:hidden flex justify-around items-center p-2">
        <SkeletonElement className="h-10 w-16 rounded-md" />
        <SkeletonElement className="h-10 w-16 rounded-md" />
        <SkeletonElement className="h-10 w-16 rounded-md" />
    </div>
);

export const AppSkeleton: React.FC = () => (
    <div className="max-w-7xl mx-auto">
        <SkeletonHeader />
        <main className="p-4 md:p-8">
            <SkeletonBanner />
            <div className="mt-6 space-y-6 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
                <SkeletonPlanCard />
                <SkeletonPlanCard />
                <SkeletonPlanCard />
                <SkeletonPlanCard />
            </div>
        </main>
        <SkeletonBottomNav />
    </div>
);