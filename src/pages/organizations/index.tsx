import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import type { Organization } from '@/types/organization';

const OrganizationSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);
  const navigate = useNavigate();

  // TODO: Replace with actual API call
  const organizations: Organization[] = [];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // TODO: Implement search functionality
  };

  const handleJoin = (organization: Organization) => {
    navigate(`/organization/${organization.slug}`);
  };

  const handleFollow = (organization: Organization) => {
    // TODO: Implement follow functionality
  };

  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-3xl font-bold mb-8'>Search Organizations</h1>

      <div className='flex gap-4 mb-8'>
        <Input
          type='text'
          placeholder='Search organizations...'
          value={searchQuery}
          onChange={e => handleSearch(e.target.value)}
          className='max-w-xl'
        />
        <Button>Search</Button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {organizations.map(organization => (
          <Card key={organization.id} className='p-6'>
            <div className='flex items-center gap-4 mb-4'>
              {organization.logo && (
                <img src={organization.logo} alt={organization.name} className='w-16 h-16 rounded-full object-cover' />
              )}
              <div>
                <h3 className='text-xl font-semibold'>{organization.name}</h3>
                <p className='text-gray-500'>{organization.location}</p>
              </div>
            </div>
            <p className='text-gray-600 mb-4 line-clamp-2'>{organization.description}</p>
            <div className='flex justify-between items-center'>
              <Button variant='outline' onClick={() => setSelectedOrganization(organization)}>
                View Details
              </Button>
              <div className='text-sm text-gray-500'>{organization.studentsCount} Students</div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedOrganization} onOpenChange={() => setSelectedOrganization(null)}>
        {selectedOrganization && (
          <div className='p-6'>
            <h2 className='text-2xl font-bold mb-4'>{selectedOrganization.name}</h2>

            {selectedOrganization.coverImage && (
              <img
                src={selectedOrganization.coverImage}
                alt={selectedOrganization.name}
                className='w-full h-48 object-cover rounded-lg mb-6'
              />
            )}

            <p className='text-gray-600 mb-6'>{selectedOrganization.description}</p>

            <div className='mb-6'>
              <h3 className='text-lg font-semibold mb-2'>Departments</h3>
              <div className='grid grid-cols-2 gap-2'>
                {selectedOrganization.departments.map(dept => (
                  <div key={dept.id} className='p-2 bg-gray-100 rounded text-sm'>
                    {dept.name}
                  </div>
                ))}
              </div>
            </div>

            <div className='flex gap-4'>
              <Button onClick={() => handleJoin(selectedOrganization)} className='flex-1'>
                Join Institute
              </Button>
              <Button variant='outline' onClick={() => handleFollow(selectedOrganization)} className='flex-1'>
                Follow ({selectedOrganization.followersCount})
              </Button>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default OrganizationSearchPage;
