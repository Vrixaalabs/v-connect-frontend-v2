import { useState } from 'react';
import { Table } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog } from '@/components/ui/dialog';
import type { OrganizationJoinRequest } from '@/types/organization';
import OrganizationAdminLayout from '@/components/admin/organization/OrganizationAdminLayout';
import { useNavigate } from 'react-router-dom';

const InstituteJoinRequestsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<OrganizationJoinRequest | null>(null);
  const navigate = useNavigate();
  // TODO: Replace with actual API call
  const requests: OrganizationJoinRequest[] = [];

  const handleApprove = async (request: OrganizationJoinRequest) => {
    navigate(`/admin/organization/requests/${request.id}/approve`);
    // TODO: Implement request approval
  };

  const handleReject = async (request: OrganizationJoinRequest) => {
    navigate(`/admin/organization/requests/${request.id}/reject`);
    // TODO: Implement request rejection
  };

  return (
    <OrganizationAdminLayout title='Join Requests' description='Manage join requests from students'>
      <div>
        <div className='flex justify-between items-center mb-6'>
          <Input
            type='text'
            placeholder='Search requests...'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className='max-w-sm'
          />
        </div>

        <div className='rounded-md border'>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Roll Number</th>
                <th>Department</th>
                <th>School</th>
                <th>Status</th>
                <th>Request Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(request => (
                <tr key={request.id}>
                  <td>{request.name}</td>
                  <td>{request.rollNumber}</td>
                  <td>{request.department}</td>
                  <td>{request.school}</td>
                  <td>
                    <span
                      className={`capitalize ${
                        request.status === 'pending'
                          ? 'text-yellow-600'
                          : request.status === 'approved'
                            ? 'text-green-600'
                            : 'text-red-600'
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td>{new Date(request.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className='flex gap-2'>
                      {request.status === 'pending' && (
                        <>
                          <Button variant='default' size='sm' onClick={() => handleApprove(request)}>
                            Approve
                          </Button>
                          <Button variant='destructive' size='sm' onClick={() => handleReject(request)}>
                            Reject
                          </Button>
                        </>
                      )}
                      <Button variant='outline' size='sm' onClick={() => setSelectedRequest(request)}>
                        View
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
          {selectedRequest && (
            <div className='p-6'>
              <h2 className='text-2xl font-bold mb-4'>Join Request Details</h2>
              <div className='space-y-4'>
                <div>
                  <label className='font-semibold'>Name:</label>
                  <p>{selectedRequest.name}</p>
                </div>
                <div>
                  <label className='font-semibold'>Roll Number:</label>
                  <p>{selectedRequest.rollNumber}</p>
                </div>
                <div>
                  <label className='font-semibold'>Department:</label>
                  <p>{selectedRequest.department}</p>
                </div>
                <div>
                  <label className='font-semibold'>School:</label>
                  <p>{selectedRequest.school}</p>
                </div>
                <div>
                  <label className='font-semibold'>Status:</label>
                  <p className='capitalize'>{selectedRequest.status}</p>
                </div>
                <div>
                  <label className='font-semibold'>Request Date:</label>
                  <p>{new Date(selectedRequest.createdAt).toLocaleDateString()}</p>
                </div>

                {selectedRequest.status === 'pending' && (
                  <div className='flex gap-4 mt-6'>
                    <Button onClick={() => handleApprove(selectedRequest)} className='flex-1'>
                      Approve
                    </Button>
                    <Button variant='destructive' onClick={() => handleReject(selectedRequest)} className='flex-1'>
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </Dialog>
      </div>
    </OrganizationAdminLayout>
  );
};

export default InstituteJoinRequestsPage;
