import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserCellProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export function UserCell({ user }: UserCellProps) {
  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
    
  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-8 w-8">
        {user.avatar && (
          <AvatarImage src={user.avatar} alt={user.name} />
        )}
        <AvatarFallback className="text-xs">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-foreground">
          {user.name}
        </span>
        <span className="text-xs text-muted-foreground">
          {user.email}
        </span>
      </div>
    </div>
  );
}

