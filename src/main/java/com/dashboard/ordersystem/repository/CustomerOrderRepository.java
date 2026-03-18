package com.dashboard.ordersystem.repository;
import com.dashboard.ordersystem.model.CustomerOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface CustomerOrderRepository extends JpaRepository<CustomerOrder, Long> {
    List<CustomerOrder> findByEmail(String email);
    List<CustomerOrder> findByStatus(String status);
}