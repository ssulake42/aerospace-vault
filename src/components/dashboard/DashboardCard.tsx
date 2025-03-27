
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardCardProps {
  title: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
  actionLink?: string;
  actionText?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  className,
  children,
  actionLink,
  actionText = 'View All'
}) => {
  return (
    <Card className={cn("overflow-hidden h-full card-hover", className)}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {actionLink && (
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto text-xs"
            asChild
          >
            <Link to={actionLink}>
              {actionText}
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
