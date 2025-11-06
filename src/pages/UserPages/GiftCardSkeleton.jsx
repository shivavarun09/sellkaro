import {
  Card,
  CardContent,
  CardActions,
  Divider,
  Skeleton,
  Stack,
} from "@mui/material";

export default function GiftCardSkeleton() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={1}>
          {/* Chip placeholder */}
          <Skeleton variant="rounded" width={90} height={26} />

          {/* OrderId heading */}
          <Skeleton variant="text" width="50%" height={30} />

          <Divider />

          {/* GCCODE Row */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Skeleton variant="circular" width={24} height={24} />
            <Skeleton variant="text" width="60%" height={24} />
          </Stack>

          {/* GCPIN Row */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Skeleton variant="circular" width={24} height={24} />
            <Skeleton variant="text" width="50%" height={24} />
          </Stack>

          {/* GCVALUE Row */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Skeleton variant="circular" width={24} height={24} />
            <Skeleton variant="text" width="40%" height={24} />
          </Stack>

          {/* GCEXPIRY Row */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Skeleton variant="circular" width={24} height={24} />
            <Skeleton variant="text" width="50%" height={24} />
          </Stack>

          {/* Status Row */}
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
            <Skeleton variant="circular" width={20} height={20} />
            <Skeleton variant="text" width="30%" height={22} />
          </Stack>
        </Stack>
      </CardContent>

      <Divider />

      <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
        {/* Payout text placeholder */}
        <Skeleton variant="text" width="40%" height={28} />

        {/* If you want button skeleton, uncomment */}
        {/* <Skeleton variant="rounded" width={120} height={36} /> */}
      </CardActions>
    </Card>
  );
}
