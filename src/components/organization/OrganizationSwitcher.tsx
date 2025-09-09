import { Building2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppSelector } from '@/hooks/redux';

// interface Organization {
//   id: string;
//   name: string;
//   role: string;
//   status: string;
// }

export const OrganizationSwitcher = () => {
  const { organizations, currentOrganization } = useAppSelector(state => state.auth);

  const handleOrganizationSelect = () => {
    // dispatch(setCurrentOrganization(org));
  };

  if (!organizations?.length) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='w-full justify-start'>
          <Building2 className='mr-2 h-4 w-4' />
          <span className='flex-1 text-left truncate'>{currentOrganization?.name || 'Select Organization'}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>Your Organizations</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {organizations.map(org => (
          <DropdownMenuItem key={org.id} onClick={() => handleOrganizationSelect()} className='cursor-pointer'>
            <span className='flex-1'>{org.name}</span>
            {currentOrganization?.id === org.id && <Check className='h-4 w-4 text-primary' />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrganizationSwitcher;
