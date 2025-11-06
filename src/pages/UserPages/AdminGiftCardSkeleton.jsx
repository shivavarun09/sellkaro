import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Divider,
  Button,
  Stack,
  Skeleton,
} from "@mui/material";

export default function GiftCardSkeleton() {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Stack spacing={1}>
          {/* Chip placeholder */}
          <Skeleton variant="rounded" width={80} height={24} sx={{ mb: 1 }} />

          {/* Order ID text */}
          <Skeleton variant="text" width="60%" height={28} />

          <Divider sx={{ my: 1 }} />

          {/* Info Rows (4 rows of icon + text) */}
          <Stack spacing={1}>
            <Skeleton variant="rectangular" width="100%" height={24} />
            <Skeleton variant="rectangular" width="100%" height={24} />
            <Skeleton variant="rectangular" width="100%" height={24} />
            <Skeleton variant="rectangular" width="100%" height={24} />
          </Stack>

          {/* Payout text */}
          <Skeleton variant="text" width="50%" height={22} />

          {/* Select dropdown placeholder */}
          <Skeleton variant="rounded" width="100%" height={40} sx={{ mt: 1 }} />
        </Stack>
      </CardContent>

      <Divider />

      <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
        {/* Buttons skeleton */}
        <Skeleton variant="rounded" width={120} height={36} />
        <Skeleton variant="rounded" width={120} height={36} />
      </CardActions>
    </Card>
  );
}
