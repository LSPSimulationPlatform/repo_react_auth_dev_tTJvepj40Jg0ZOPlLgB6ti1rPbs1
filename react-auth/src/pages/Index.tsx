// --------------------------------------------
// 🔹 Default Index (Home) Page
// --------------------------------------------
// This component serves as a simple welcome screen or placeholder page.
// It uses Tailwind CSS classes for styling.

const Index = () => {
  return (
    // Full-screen container (takes up full viewport height)
    // Flexbox centers the content both vertically and horizontally
    // `bg-background` uses your Tailwind background color (from theme)
    <div className="min-h-screen flex items-center justify-center bg-background">
      
      {/* Inner container for text content, centered */}
      <div className="text-center">
        
        {/* Main heading */}
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Your Blank App
        </h1>

        {/* Subheading / description text */}
        <p className="text-xl text-muted-foreground">
          Start building your amazing project here!
        </p>
      </div>
    </div>
  );
};

// Export the component as the default export
export default Index;