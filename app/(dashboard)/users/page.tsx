import { fetchUsersOnServer } from "@/requests/server/user";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function UsersPage() {
  const users = await fetchUsersOnServer();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Users</h1>
      </div>

      <Card className="border-t-4 border-t-primary">
        <CardHeader>
          <CardTitle className="text-primary">User Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-b-2 border-b-primary/20">
                {users.length > 0 &&
                  Object.keys(users[0]).map((key) => (
                    <TableHead
                      key={key}
                      className="text-foreground font-semibold"
                    >
                      {key
                        // insert space before capital letters
                        .replace(/([A-Z])/g, " $1")
                        // capitalize first letter
                        .replace(/^./, (str) => str.toUpperCase())}
                    </TableHead>
                  ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="hover:bg-primary/5">
                  {Object.values(user).map((value, index) => (
                    <TableCell key={index} className="text-foreground">
                      {value?.toString()}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
