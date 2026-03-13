// Service grid UI
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../services/screens/service_grid.dart';
import '../../../core/constants/theme.dart';
import '../../../providers/provider_repository.dart';

class HomeScreen extends ConsumerWidget {
  const HomeScreen({Key? key}) : super(key: key);

  static const _services = [
    {'id': 'sid_plumber', 'name': 'Plumber', 'icon': Icons.plumbing},
    {'id': 'sid_electrician', 'name': 'Electrician', 'icon': Icons.flash_on},
    {'id': 'sid_ac', 'name': 'AC Repair', 'icon': Icons.ac_unit},
    {'id': 'sid_cleaning', 'name': 'Cleaning', 'icon': Icons.cleaning_services},
    // Add more as needed
  ];

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('HouseBuddy'),
        actions: [
          IconButton(
            icon: const Icon(Icons.person),
            onPressed: () => context.go('/home/profile'),
          ),
        ],
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Padding(
            padding: EdgeInsets.all(16.0),
            child: Text('Choose a Service', style: AppText.headline),
          ),
          Expanded(
            child: GridView.builder(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                mainAxisSpacing: 14,
                crossAxisSpacing: 14,
                childAspectRatio: 1.0,
              ),
              itemCount: _services.length,
              itemBuilder: (context, idx) {
                final svc = _services[idx];
                return GestureDetector(
                  onTap: () => context.go('/home/services/${svc['id']}'),
                  child: Card(
                    elevation: 4,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(svc['icon'] as IconData, size: 48, color: AppColors.accent),
                        const SizedBox(height: 12),
                        Text(svc['name'] as String,
                            style: const TextStyle(fontWeight: FontWeight.w600)),
                      ],
                    ).animate().scale(begin: 0.9, end: 1.0, duration: 300.ms),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
