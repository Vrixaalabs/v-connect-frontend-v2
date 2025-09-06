import { MemberLayout } from '@/components/layouts/MemberLayout';

const FeedPage = () => {
  return (
    <MemberLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Feed</h1>
          <p className="text-muted-foreground">
            Stay updated with the latest posts and activities from your network.
          </p>
        </div>

        {/* Feed Content Placeholder */}
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-lg border bg-card text-card-foreground shadow-sm p-6"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-muted" />
                  <div>
                    <div className="font-medium">User Name</div>
                    <div className="text-sm text-muted-foreground">2 hours ago</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-3/4 bg-muted rounded" />
                  <div className="h-4 w-1/2 bg-muted rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MemberLayout>
  );
};

export default FeedPage;