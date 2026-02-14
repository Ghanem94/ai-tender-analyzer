export default async function ResultsPage({ params }: { params: { id: string } }) {
    // Await params for Next.js 15+ if needed, though usually standard in 14. 
    // Next 15 changes params to Promise, Next 16 might strictly enforce it.
    const { id } = await Promise.resolve(params);

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold text-primary mb-6">Analysis Results (Result #{id})</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card rounded-[40px] p-6 shadow-md border border-border">
                    <h2 className="text-xl font-semibold mb-2">Risk Score</h2>
                    {/* Risk Gauge Placeholder */}
                </div>
                <div className="bg-card rounded-[40px] p-6 shadow-md border border-border">
                    <h2 className="text-xl font-semibold mb-2">Key Insights</h2>
                    {/* Insights List Placeholder */}
                </div>
            </div>
        </div>
    );
}
