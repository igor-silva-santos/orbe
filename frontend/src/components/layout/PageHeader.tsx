interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => (
  <div className="mb-6 md:mb-8">
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold orbe-text-primary mb-2 md:mb-4">{title}</h1>
    {description && (
      <p className="text-muted-foreground text-sm sm:text-base md:text-lg">{description}</p>
    )}
  </div>
);

export default PageHeader;
