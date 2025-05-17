import React, { useEffect, useState } from "react";
import { Typography, Card, CardContent, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchModel(`http://localhost:8081/user/${userId}`)
      .then(setUser)
      .catch(() => setUser(null));
  }, [userId]);

  if (!user) {
    return <Typography variant="h4">User not found</Typography>;
  }

  return (
    <Card className="user-detail-card">
      <CardContent>
        <div className="user-detail-header">
          <Typography variant="h4" gutterBottom>
            {user.first_name} {user.last_name}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            {user.occupation}
          </Typography>
        </div>
        <Typography variant="body1" className="user-detail-location">
          Location: {user.location}
        </Typography>
        <Typography variant="body1" className="user-detail-description">
          {user.description}
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to={`/photos/${user._id}`}
          color="primary"
          className="photos-button"
        >
          View Photos
        </Button>
      </CardContent>
    </Card>
  );
}

export default UserDetail;
